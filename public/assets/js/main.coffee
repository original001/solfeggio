minorConfig = ['Am', 'Cm', 'Dm', 'Em', 'Fm', 'Gm']
majorConfig = ['A', 'C', 'D', 'E', 'F', 'G']
moreConfig = ['A7', 'A#', 'A#m']
allConfig = minorConfig.concat minorConfig, majorConfig, moreConfig 

$ ->
  ion.sound
    sounds: allConfig.map (chord) ->
      {name: chord}
    path: 'assets/audio/'
  $ '.js-minor'	
    .on 'click', () ->
      new App minorConfig, $(this)

  $ '.js-major' 
    .on 'click', () ->
      new App majorConfig, $(this)

  $ '.js-more' 
    .on 'click', () ->
      new App moreConfig, $(this)

  $ '.js-all' 
    .on 'click', () ->
      new App allConfig, $(this)

playRandom = (config, elem) ->
  index = getRandom(0, config.length - 1)

  ion.sound.play config[index] 

  return config[index]

getRandom = (min, max) ->
  Math.floor Math.random() * (max - min + 1) + min


class App
  constructor: (@config, @$elem) -> 
    $ '.chord-tab'
      .removeClass 'active'

    @$elem.addClass 'active'
    @prevChord = null
    do @init
    do @play

  init: -> 
    $ 'body'
      .off 'keydown'

    $ 'body'
      .on "keydown", (e) =>
        unless @chord then return
        if e.keyCode == 32
          do @show
          do @updateLoader
          @prevChord = @chord
          @chord = null
          setTimeout =>
            do @play
          , 2000
        if e.keyCode == 40
          ion.sound.play @chord

  play: ->
    $ '.js-chord-text'
      .text '...'

    filteredConfig = @config.filter (chord) => chord != @prevChord

    @chord = playRandom filteredConfig

  show: ->
    $ '.js-chord-text'
      .text @chord

  updateLoader: ->
    $ '.js-loader'
      .toggleClass 'active'

