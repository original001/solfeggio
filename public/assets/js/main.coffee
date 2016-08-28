
minorConfig = ['Am', 'Cm', 'Dm', 'Em', 'Fm', 'Gm']
majorConfig = ['A', 'C', 'D', 'E', 'F', 'G']
moreConfig = ['A7', 'A#', 'A#m']
allConfig = minorConfig.concat minorConfig, majorConfig, moreConfig 

config = [
    name: 'minor'
    chords: minorConfig
  ,
    name: 'major'
    chords: majorConfig
  ,
    name: 'more'
    chords: moreConfig
  ,
    name: 'all'
    chords: allConfig
]

$ ->
  ion.sound
    sounds: allConfig.map (chord) ->
      {name: chord}
    path: 'assets/audio/'

  appCreator = new AppCreator

  $ '.js-item'
    .on 'click', () ->
      appCreator.create(this)

playRandom = (config, elem) ->
  index = getRandom(0, config.length - 1)

  ion.sound.play config[index] 

  return config[index]

getRandom = (min, max) ->
  Math.floor Math.random() * (max - min + 1) + min

class AppCreator
  constructor: () ->

  create: (elem) ->
    $el = $(elem)
    configName = $el.data().config
    configData = config.filter (config) -> config.name == configName

    do @detach

    $ '.js-item'
      .removeClass 'active'

    $el.addClass 'active'

    data = $el.data "config-#{configName}"

    if !data then $el.data "config-#{configName}", data = new App configData[0].chords

    @currentApp = data.init();

  detach: ->
    $ 'body'
      .off 'keydown'

class App
  constructor: (@config) -> 
    @prevChord = null

  init: -> 
    do @play
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

