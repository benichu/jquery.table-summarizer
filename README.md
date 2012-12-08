# [tableSummarizer](https://github.com/benichu/jquery.table-summarizer) [![Build Status](https://secure.travis-ci.org/benichu/jquery.table-summarizer.png?branch=master)](https://travis-ci.org/benichu/jquery.table-summarizer)

`tableSummarizer` is a jQuery Plugin written in CoffeeScript to help append or
prepend a summary row to each `<tbody>` inside the HTML element you apply it to.

You can pass many options explained at the bottom of this [README](#options), the best way to understand
what this plugin does is to check the example in the [documentation](#documentation).

## Website Url

https://github.com/benichu/jquery.table-summarizer

## Bug tracker

If you find a bug, please raise it the [issue here](https://github.com/benichu/jquery.table-summarizer/issues) on Github!

## Documentation

download this file [jquery.table-summarizer.min.js](https://github.com/benichu/jquery.table-summarizer/blob/master/js/jquery.table-summarizer.min.js),
and add it to your project.


### Basic HTML

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

### Basic Initialization

```javascript
$(".summarized").tableSummarizer({
  summaryCssClass: 'summary',
  cssClass: ["duration", "other_duration"],
  onReady: function(el) {
    // do whatever you want, for example, formatting your sub-totals...
  }
});
```

### HTML Result

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
        <td class="duration" data-minute="30.2">30.20</td>
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
        <td class="duration" data-minute="30">30.00</td>
        <td class="other_duration"><span data-minute="60">60.00</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Options

```javascript
debug: false
summaryCssClass: 'summary'        # CSS class to be applied to the summary row
summaryLabel: ''                  # Display this label in the first cell of the summary row, if empty of sub-total value
position: 'after'                 # Show the summary row, 'before' or 'after' each tbody
showResultValue: true             # Do you want to show the sub-total inside the summary <td>
summarizableCss: ['duration']     # Calculate total of values contained somewhere inside elements with this CSS class
summarizableAttr: 'data-minute'   # The data attribute that contains the value to sum (ex: <td data-minute="120">)
roundTo: 2                        # Round your sub-totals results

onReady: ->                       # Function(), called when tableSummarizer is ready
onError: ->                       # Function(), called when tableSummarizer has not found an element to work on
```

## Developer

Developed by Benjamin Thouret, [benjamin.thouret.com](http://benjamin.thouret.com),
[Github Profile](http://github.com/benichu)

Based on the [MiniBoilerplate](http://miniboilerplate.com/) template.

Check [MiniBoilerplate's website](http://miniboilerplate.com/) for instructions
about the development workflow to be used for improving this plugin.
