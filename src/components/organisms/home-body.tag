require("../molecules/poop")
require("../molecules/poop-form")

<home-body>
  <poop-form></poop-form>
  <div id="tagSelectContainer">
    <ul id="tagList">
      <li each={ count, name in poopTags }>
        <input type="checkbox" value="{ name }">{ name } ({ count })
      </li>
    </ul>
  </div>
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
