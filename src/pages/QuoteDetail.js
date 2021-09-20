import React, {useEffect} from "react";
import { Route, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = props => {
    const match = useRouteMatch();
    const params = useParams();
    const {id} = params;
    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);
    useEffect(() => {
        sendRequest(id);
    }, [sendRequest, id]);

    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner/>
            </div>
        );
    }

    if (error) {
        return (
            <p className="centered focused">{error}</p>
        );
    }

    if (!loadedQuote.text) {
        return <p>No quote found.</p>
    }
    return (
        <>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
        <Route path={match.path} exact>
            <div className="centered">
                <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
            </div>
        </Route>
        <Route path={`${match.path}/comments`}>
            <Comments/>
        </Route>
        </>
    );
}

export default QuoteDetail;