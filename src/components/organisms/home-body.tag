<home-body>
  <div id="formContainer">
    <form onsubmit="postPoop(event)">
      <input id="poopTextBox" placeholder="poop here">
      <input id="tagsTextBox" placeholder="tag1, tag2">
      <button>Post</button>
    </form>
  </div>
  <script>
    var auth = require("../../firebase").auth
    var database = require("../../firebase").database

    function postPoop(e) {
      e.preventDefault()
      var poopTextBox = document.getElementById("poopTextBox")
      var tagsTextBox = document.getElementById("tagsTextBox")
      var tags = {}
      tagsTextBox.value.split(",").forEach(function(tag) {
        tag = tag.replace(/^\s+|\s+$/g, "")
        tags[tag] = true
        incrementTag(tag)
      })
      var text = poopTextBox.value
      posted_at = new Date().getTime()
      var poopData = {
        text,
        tags,
        posted_at
      }
      console.log(poopData)
      var result = database.ref("/poops/").push(poopData)
      poopTextBox.value = ""
      tagsTextBox.value = ""
      console.log("pushed. result:")
      console.log(result)
    }
    function incrementTag(tag) {
      database.ref("/tags/" + tag).transaction(function(count) {
        if (count) {
          return count + 1
        } else {
          return 1
        }
      })
    }
  </script>
  <div id="tagSelectContainer">
    <ul id="tagList">
    </ul>
  </div>
  <div id="poopsContainer">
    <ul id="poops">
    </ul>
  </div>
  <script>
    function selectedTags() {
      var tagList = document.getElementById("tagList")
      var tags = []
      console.log(tagList)
      tagList.childNodes.forEach(function(li) {
        if (li.childNodes[0].checked) {
          tags.push(li.children[0].value)
        }
      })
      return tags
    }

    window.onload = function() {
      // Authentication
      auth.signInAnonymously().catch(function(error) {
        console.error(error)
      })

      // Listeners
      database.ref("/poops").on("child_added", function(data) {
        var poopList = document.getElementById("poops")
        var poop = document.createElement("li")
        poop.innerText = data.val().text
        poopList.appendChild(poop)
      })

      database.ref("/tags").on("value", function(snapshot) {
        var tagList = document.getElementById("tagList")
        tagList.innerHTML = ""
        var tags = snapshot.val()
        var li, checkbox
        for (tag in tags) {
          checkbox = document.createElement("input")
          checkbox.setAttribute("type", "checkbox")
          checkbox.setAttribute("value", tag)
          li = document.createElement("li")
          li.appendChild(checkbox)
          li.appendChild(document.createTextNode(tag + " (" + tags[tag] + ")"))
          tagList.appendChild(li)
        }
      })
    }
  </script>
</home-body>
