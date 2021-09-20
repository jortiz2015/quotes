import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {id} = params;
  const {sendRequest, status, data: loadedComments} = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner/>
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments}/>
  }

  if (status === "completed" && (!loadedComments || loadedComments.length === 0)) {
    comments = (
      <div className="centered">
        <p>No comments found.</p>
      </div>
    );
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddedComment={addedCommentHandler} id={params.id}/>}
      {comments}
    </section>
  );
};

export default Comments;
