require("../molecules/poop-form")
require("../molecules/tag-list")
require("../molecules/poop-list")

<home-body>
  <poop-form></poop-form>
  <tag-list poop-tags={ poopTags }></tag-list>
  <poop-list poops={ poops }></poop-list>

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
        this.poops.unshift(data.val())
        this.update()
      })

      database.ref("/tags").on("value", (snapshot) => {
        this.poopTags = snapshot.val()
        this.update()
      })
    });
  </script>
</home-body>
