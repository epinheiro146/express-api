$(document).ready(function () {

    $('#chirpForm').append('<button id="chirpButton" class="btn btn-primary">Chirp!</button>');

    $(document.body).append('<div id="feed" class="container-sm d-flex flex-column-reverse"></div>');

    $(chirpButton).click((e) => {
        e.preventDefault();

        const usernameVal = $("#username").val();

        const messageVal = $("#message").val();

        $.ajax("/api/chirps", {
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username: usernameVal, message: messageVal }),
            success: () => {
                getChirps();
            }
        })

    });

    getChirps();

})

let getChirps = () => {
    $.ajax("/api/chirps", {
        success: (data) => {
            $('#feed').empty();
            data.forEach(post => {
                const card = $(`<div class="card m-2"></div>`);
                const user = $(`<div class="card-title">${post.username}:</div>`);
                const messageContainer = $(`<div class="d-flex flex-row justify-content-between"></div>`);
                const message = $(`<div class="col-6 card-body"><p>${post.message}</p></div>`);
                const deleteButton = $(`<button class="col-1 m-4 btn btn-danger">X</button>`);

                $(deleteButton).click(() => {
                    $.ajax(`/api/chirps/${post.id}`, {
                        type: "DELETE",
                        success: () => {
                            getChirps();
                        }
                    })
                });

                $('#feed').append(card);
                $(card).append(user);
                $(card).append(messageContainer);
                $(messageContainer).append(message);
                $(messageContainer).append(deleteButton);
            });
        }
    })
}