<poop-form>
  <div id="formContainer">
    <form onsubmit={ postPoop }>
      <input ref="poopTextBox" placeholder="poop here">
      <input ref="tagsTextBox" placeholder="tag1, tag2">
      <button>Post</button>
    </form>
  </div>

  <script>
    let database = require("../../firebase").database

    this.postPoop = (e) => {
      e.preventDefault()
      let text = this.refs.poopTextBox.value
      let posted_at = new Date().getTime()
      let poopData = {
        text,
        posted_at
      }
      if (this.refs.tagsTextBox.value) {
        let tags = {}
        this.refs.tagsTextBox.value.split(",").forEach((tag) => {
          tag = tag.replace(/^\s+|\s+$/g, "")
          tags[tag] = true
          this.incrementTag(tag)
        })
        poopData["tags"] = tags
      }
      let result = database.ref("/poops/").push(poopData)
      this.refs.poopTextBox.value = ""
      this.refs.tagsTextBox.value = ""
    }

    this.incrementTag = (tag) => {
      database.ref("/tags/" + tag).transaction((count) => {
        if (count) {
          return count + 1
        } else {
          return 1
        }
      })
    }
  </script>
</poop-form>
