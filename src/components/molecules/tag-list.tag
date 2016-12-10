<tag-list>
  <div>
    <ul>
      <li each={ count, name in opts.poopTags }>
        <input type="checkbox" value="{ name }">{ name } ({ count })
      </li>
    </ul>
  </div>
</tag-list>
