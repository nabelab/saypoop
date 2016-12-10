<home-body>
  <div id="formContainer">
    <form onsubmit={ postPoop }>
      <input ref="poopTextBox" placeholder="poop here">
      <input ref="tagsTextBox" placeholder="tag1, tag2">
      <button>Post</button>
    </form>
  </div>
  <div id="tagSelectContainer">
    <ul id="tagList">
      <li each={ poopTags }>
        <input type="checkbox" value="{ name }">{ name } ({ count })
      </li>
    </ul>
  </div>
  <div id="poopsContainer">
    <ul id="poops">
      <li each={ poops }>{ text }</li>
    </ul>
  </div>

  <script>
    let auth = require("../../firebase").auth
    let database = require("../../firebase").database

    this.poops = []
    this.poopTags = []

    this.on("mount", () => {
      // Authentication
      auth.signInAnonymously().catch((error) => {
        console.error(error)
      })

      // Listeners
      database.ref("/poops").on("child_added", (data) => {
        this.poops.push({ text: data.val().text })
        this.update()
      })

      database.ref("/tags").on("value", (snapshot) => {
        let tags = snapshot.val()
        for (let tag in tags) {
          this.poopTags.push({ name: tag, count: tags[tag] })
        }
        this.update()
      })
    });

    this.postPoop = (e) => {
      e.preventDefault()
      var text = this.refs.poopTextBox.value
      var posted_at = new Date().getTime()
      var poopData = {
        text,
        posted_at
      }
      if (this.refs.tagsTextBox.value) {
        var tags = {}
        this.refs.tagsTextBox.value.split(",").forEach(function(tag) {
          tag = tag.replace(/^\s+|\s+$/g, "")
          tags[tag] = true
          incrementTag(tag)
        })
        poopData["tags"] = tags
      }
      var result = database.ref("/poops/").push(poopData)
      this.refs.poopTextBox.value = ""
      this.refs.tagsTextBox.value = ""
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
  </script>
</home-body>
