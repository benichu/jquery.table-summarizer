# [tableSummarizer](https://github.com/benichu/jquery.table-summarizer)

TODO: write a better description!

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
  summaryCssClass: 'summary',
  cssClass: ["duration", "other_duration"],
  onReady: function(el) {
    // do whatever you want, for example, formatting your sub-totals...
  }
});
```
__HTML Result__

```html
<div class="summarized">
  <table>
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
      <tr class="summary">
        <td></td>
        <td class="duration" data-minute="30.2">30.2</td>
        <td class="other_duration"><span data-minute="60.33">60.33</td>
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
      <tr class="summary">
        <td></td>
        <td class="duration" data-minute="30">30</td>
        <td class="other_duration"><span data-minute="60">60</td>
      </tr>
    </tbody>
  </table>
</div>
```

- TODO: doc
- TODO: specs

## Developer

Developed by Benjamin Thouret, [benjamin.thouret.com](http://benjamin.thouret.com)

+ [Github Profile](http://github.com/benichu)
