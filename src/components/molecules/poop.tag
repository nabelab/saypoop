<poop>
  <div>
    <ul>
      <li each={ tag in poopTags }>{ tag }</li>
    </ul>
    <p>{ text }</p>
    <p class="posted-at">{ postedAt.toLocaleDateString() } { postedAt.toLocaleTimeString() }</p>
  </div>

  <script>
    this.poopTags = Object.keys(opts.poop.tags)
    this.text = opts.poop.text
    this.postedAt = new Date(opts.poop.posted_at)
  </script>

  <style>
    poop div {
      background-color: #eee;
      margin: 8px;
      padding: 8px;
    }
    poop div ul {
      padding: 0;
    }
    poop div ul li {
      display: inline-block;
      background-color: #aaa;
      color: #fff;
      font-size: 0.8rem;
      border-radius: 5px;
      margin: 0 4px;
      padding: 2px;
    }
    poop div p.posted-at {
      color: #aaa;
    }
  </style>
</poop>
