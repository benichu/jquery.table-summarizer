# [tableSummarizer](https://github.com/benichu/jquery.table-summarizer)

`tableSummarizer` is a jQuery Plugin written in CoffeeScript to help append or
prepend a summary row to a `<tbody>` for each `<td>` tagged by a specified CSS class.

## Version

v1.0.0 prototype

## Website Url

https://github.com/benichu/jquery.table-summarizer

## Bug tracker

If you find a bug, please raise it the [issue here](https://github.com/benichu/jquery.table-summarizer/issues) on Github!

## Documentation

download this file [jquery.table-summarizer.js](https://github.com/benichu/jquery.table-summarizer/blob/master/js/jquery.table-summarizer.js),
and add it to your project.


__Basic HTML__

```html
<div class="summarized">
  <table>
    <thead>
      <tr>
        <th>COL 1</th>
        <th>COL 2</th>
        <th>COL 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ROW 1</td>
        <td class="duration" data-minute="30.2">30.2</td>
        <td class="other_duration"><span data-minute="45">45</span></td>
      </tr>
      <tr>
        <td>ROW 2</td>
        <td class="duration" data-minute="0">0</td>
        <td class="other_duration"><span data-minute="15.33">15.33</td>
      </tr>
      <tr>
        <td>ROW 3</td>
        <td class="duration" data-minute=""></td>
        <td class="other_duration"><span data-minute="120">120</span></td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td>ROW 1</td>
        <td class="duration" data-minute="30">30</td>
        <td class="other_duration"><span data-minute="45">45</span></td>
      </tr>
      <tr>
        <td>ROW 2</td>
        <td class="duration" data-minute="0">0</td>
        <td class="other_duration"><span data-minute="15">15</td>
      </tr>
    </tbody>
  </table>
</div>
```

__Basic Initialization__

```javascript
$(".summarized").tableSummarizer({
  cssClass: ["duration", "other_duration"],
  onReady: function(el) {
    // do whatever you want, for example, formatting your sub-totals...
  }
});
```

- TODO: doc
- TODO: specs

## Developer

Developed by Benjamin Thouret, [benjamin.thouret.com](http://benjamin.thouret.com)

+ [Github Profile](http://github.com/benichu)
