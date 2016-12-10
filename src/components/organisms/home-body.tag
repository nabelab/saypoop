require("../molecules/poop")
require("../molecules/poop-form")
require("../molecules/tag-list")

<home-body>
  <poop-form></poop-form>
  <tag-list poop-tags={ poopTags }></tag-list>
  <div id="poopsContainer">
    <poop poop={ poop } each={ poop in poops }></poop>
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
