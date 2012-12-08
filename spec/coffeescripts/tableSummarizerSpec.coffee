describe 'tableSummarizer', ->
  options =
    summarizableCss: ['duration', 'other_duration']
    showValue: true
    summaryCssClass: 'summary'

  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $( '#fixtures' )

  describe 'plugin functionnalities', ->
    beforeEach ->
      @plugin = new $.tableSummarizer( @$element, options )

    it 'should append a row to the first tbody', ->
      expect(@$element.find("tbody:first tr").length).toEqual 4

    it 'should append a row to the last tbody', ->
      expect(@$element.find("tbody:last tr").length).toEqual 3

    it 'should calculate the sum of data-values property on the `cssClass` element', ->
      expect(@$element.find("tbody:first tr.summary td.duration").html()).toBeCloseTo 30.20

    it 'should calculate the sum of data-values property inside the `cssClass` element', ->
      expect(@$element.find("tbody:first tr.summary td.other_duration").html()).toBeCloseTo 180.33

  describe 'plugin behavior', ->
    it 'should be available on the jQuery object', ->
      expect( $.fn.tableSummarizer ).toBeDefined()

    it 'should be chainable', ->
      expect( @$element.tableSummarizer() ).toBe @$element

    it 'should offers default values', ->
      plugin = new $.tableSummarizer( @$element )

      expect( plugin.defaults ).toBeDefined()

    it 'should overwrites the settings', ->
      plugin = new $.tableSummarizer( @$element, options )

      expect( plugin.settings.cssClass ).toBe( options.cssClass )

  describe 'plugin state', ->
    beforeEach ->
      @plugin = new $.tableSummarizer( @$element )

    it 'should have a ready state', ->
      expect( @plugin.getState() ).toBe 'ready'

    it 'should be updatable', ->
      @plugin.setState( 'new state' )

      expect( @plugin.getState() ).toBe 'new state'
