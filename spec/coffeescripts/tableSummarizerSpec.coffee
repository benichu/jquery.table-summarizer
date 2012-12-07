describe 'tableSummarizer', ->
  options =
    cssClass: ['duration', 'other_duration']

  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $( '#fixtures' )

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
