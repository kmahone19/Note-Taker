function postNotes() {
  $.ajax({
    url: "/api/notes",
    type: "GET"
  }).then(
    function (results) {
      console.log(results)
    }
  )
};


$("#save").on("click", function () {


  $.ajax({
    url: "/api/notes",
    method: "POST"
  }).then(
    function () {
      console.log("New Note added");

      location.reload();
    }
  )

})



$(document).on("click", ".delBtn", function () {
  const noteId = $(this).attr('data-id');

  $.ajax({
    url: "/api/notes/" + noteId,
    method: "DELETE"
  }).then(
    function () {
      console.log("Delted: " + id);

      location.reload();
    }
  )
})