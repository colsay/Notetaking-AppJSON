
$(function () {

    $('#submit').click((e) => {
        e.preventDefault();
        console.log(e)
        let data = $('#newNote').val()
        console.log(data)
        // console.log('hello')
        $.ajax({
            type: 'POST',
            url: "http://localhost:8000/api/notes",
            dataType: "text",
            data: { note: data },
            success: function () {
                console.log('success')
            },

        }).done(window.location.reload)

    })

    $(".input").focusout((e) => {
        console.log(e.target)

        $.ajax({
            type: "PUT",
            url: `http://localhost:8000/api/notes/${e.target.dataset.textarea}`,
            dataType: "text",
            data: { note: e.target.value },
            success: function () {
                console.log("success");
            },
        }).done(window.location.reload());
    });

    $(".remove").click((e) => {
        console.log(e.target.dataset)

        $.ajax({
            type: "DELETE",
            url: `http://localhost:8000/api/notes/${e.target.dataset.btn}`,
            success: function () {
                console.log("success");
            },
        }).done(window.location.reload());
    });

})
