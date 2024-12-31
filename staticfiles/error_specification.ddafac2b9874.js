
function specifyError(error_code) {
    if (error_code == 0) {
        return "Unable to Connect!<br />Check Your Internet Connection and Try again.";
    }
    else if (error_code == 500) {
        return "There Was a Problem Communicating With The Server!<br />Pls, try again later.";
    }
    else if (error_code == 403) {
        return "Forbidden Request!";
    }
    else if (error_code == 404) {
        return "Not Found";
    }
    else {
        return "This Request Couldn't Be Completed";
    }
}