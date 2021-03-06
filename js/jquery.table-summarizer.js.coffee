#
#  Title:     jquery.table-summarizer (tableSummarizer)
#  Homepage:  https://github.com/benichu/jquery.table-summarizer
#  Copyright: (c)2012: Benjamin Thouret <ben@2ret.com>
#  License:   MIT, https://github.com/benichu/jquery.table-summarizer/LICENSE-MIT
#

jQuery ->
  $.tableSummarizer = ( element, options ) ->
    # current state
    state = 'waiting'

    # plugin settings
    @settings = {}

    # jQuery version of DOM element attached to the plugin
    @$element = $ element

    # set current state
    @setState = ( _state ) -> state = _state

    #get current state
    @getState = -> state

    # get particular plugin setting
    @getSetting = ( key ) ->
      @settings[ key ]

    # call one of the plugin setting functions
    @callSettingFunction = ( name, args = [] ) ->
      @settings[name].apply( this, args )

    #
    # private methods
    #
    addRow = (tbody) =>
      log "Add summary row"

      @$row = tbody.find("tr:last").clone(true)

      if @settings.position is 'after'
        @$row.appendTo tbody
      else
        @$row.prependTo tbody

      @$row.addClass @settings.summaryCssClass
      # clear the TD's content
      settings = @settings
      @$row.find("td").each ->
        $(this).html("")
        $(this).find(settings.summarizableAttr).attr(settings.summarizableAttr,"")

    sumColumns = (tbody) =>
      summarizableCss = @settings.summarizableCss

      log "Summarize: #{summarizableCss}"

      for item in summarizableCss
        sumColumn = 0
        settings = @settings

        _cssScope = tbody.find("tr:not(.#{settings.summaryCssClass})")
        _cssScope.find(".#{item}[#{settings.summarizableAttr}], .#{item} [#{settings.summarizableAttr}]").each ->
          if $(this).attr(settings.summarizableAttr)
            val = parseFloat($(this).attr(settings.summarizableAttr))
          else
            val = 0
          sumColumn += val

        # Apply some rounding to avoid precision issues with the floats
        sumColumn = sumColumn.toFixed(settings.roundTo)

        # Display the value
        sumCell = tbody.find("tr.#{settings.summaryCssClass} td.#{item}")
        log "#{item}: #{sumColumn}"
        sumCell.html(sumColumn) if settings.showResultValue
        sumCell.attr(settings.summarizableAttr, sumColumn)
        # Should we display a summary label?
        log "Summary label: #{settings.summaryLabel}"
        if not not settings.summaryLabel
          firstTd = tbody.find("tr.#{settings.summaryCssClass} td:first")
          # If the first <td> is empty
          unless not not firstTd.html()
            firstTd.html(settings.summaryLabel)


    # Simple logger.
    log = (msg) =>
      console?.log msg if @settings.debug

    @init = ->
      @settings = $.extend( {}, @defaults, options )

      @setState 'waiting'

      # Check the existence of the element
      if @$element.length
        log "Element is defined."

        # look for <tbody> elements
        @$tbodies =  @$element.find("tbody")

        @$tbodies.each ->
          # append or prepend a row that will contain the sum results
          addRow($(this))
          # find the values to add and display them in the appropriate summary row
          sumColumns($(this))

        @setState 'ready'

        @callSettingFunction 'onReady', [@$element]

      else
        @setState 'error'

        @callSettingFunction 'onError', [@$element]

    # initialise the plugin
    @init()

    # make the plugin chainable
    this

  # default plugin settings
  $.tableSummarizer::defaults =
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

  $.fn.tableSummarizer = ( options ) ->
    this.each ->
      if $( this ).data( 'tableSummarizer' ) is undefined
        plugin = new $.tableSummarizer( this, options )
        $( this ).data( 'tableSummarizer', plugin )

