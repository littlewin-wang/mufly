import React  from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

import { browserHistory } from 'react-router'

import {Avatar, Back, NodeGraph, Samples, GithubLink, Footer } from 'components'
import Sentry from 'react-activity/lib/Sentry'

class NodeGraphContainer extends React.Component {
  constructor (props) {
    super(props)
    // this.animateReorder = this.animateReorder.bind(this)
  }

  componentWillMount () {
    let id = this.props.routeParams.id
    this.getArtistsAndTracks(id)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.routeParams.id !== nextProps.routeParams.id) {
      this.getArtistsAndTracks(nextProps.routeParams.id)
    }

    if (!nextProps.loading && this.props.artists !== nextProps.artists) {
      this.rmFutureNodes(nextProps)
        // .then(this.adjustPresentNode)
        // .then(this.addFutureNode)
    }
    // 2 - Move present to past or future
    //   - Move new present node to middle, if needed

    // 3 - Add new future nodes
  }

  // 1 - Remove future nodes
  rmFutureNodes (nextProps) {
    if (this.state && this.state.future.length) {
      this.state.future.map((artist) => {
        return artist.id === nextProps.artists.present.id ? artist : {}
      })
    }
    console.log(this.state, nextProps.artists)
  }

  componentWillUnmount () {
    this.props.actions.CLEAR_PAST_ARTISTS()
  }

  getNodeAndLines (props) {
    return {
      nodes: [
        props.artists.past[props.artists.past.length - 1] ? {id: props.artists.past[props.artists.past.length - 1].id, name: props.artists.past[props.artists.past.length - 1].name, region: 'PAST', regionIndex: 1} : {},
        {id: props.artists.present.id, name: props.artists.present.name, region: 'PRESENT', regionIndex: 1},
        props.artists.future[0] ? {id: props.artists.future[0].id, name: props.artists.future[0].name, region: 'FUTURE', regionIndex: 0} : {},
        props.artists.future[1] ? {id: props.artists.future[1].id, name: props.artists.future[1].name, region: 'FUTURE', regionIndex: 1} : {},
        props.artists.future[2] ? {id: props.artists.future[2].id, name: props.artists.future[2].name, region: 'FUTURE', regionIndex: 2} : {}
      ],
      lines: [
        props.artists.past[props.artists.past.length - 1] ? {from: props.artists.past[props.artists.past.length - 1].id, to: props.artists.present.id} : {},
        props.artists.future[0] ? {from: props.artists.present.id, to: props.artists.future[0].id} : {},
        props.artists.future[1] ? {from: props.artists.present.id, to: props.artists.future[1].id} : {},
        props.artists.future[2] ? {from: props.artists.present.id, to: props.artists.future[2].id} : {}
      ]
    }
  }

  getPlaying (id) {
    this.props.actions.GET_PLAYING_TRACK(id)
  }

  getArtistsAndTracks (id, ignoreId) {
    console.log('getArtistsAndTracks' + new Date())

    let pastId = this.props.artists.past[this.props.artists.past.length - 1] ? this.props.artists.past[this.props.artists.past.length - 1].id : undefined

    let calcId = ignoreId ? ignoreId : pastId

    this.props.actions.GET_PRESENT_ARTIST(id, calcId)
    this.props.actions.GET_TOP_TRACKS(id)
  }

  nodeClickHandler (id) {
    // If click past node
    let pastId = this.props.artists.past[this.props.artists.past.length - 1] ? this.props.artists.past[this.props.artists.past.length - 1].id : undefined
    if (pastId === id) {
      this.props.actions.RM_PAST_ARTIST()
      browserHistory.push(`/artist/${id}`)
      return
    }

    // If click future node
    let artist = this.props.artists.present
    if (! this.props.artists.past.some((past) => {
        return past.id === artist.id
      })) {
      this.props.actions.ADD_PAST_ARTIST(artist)
    }

    browserHistory.push(`/artist/${id}`)
  }

  render () {

    return (
      <div className="node-graph-wrapper">
        <Back />
        <GithubLink />
        { this.props.artists.present && !this.props.loading &&
          <Avatar artistAvatarUrl={this.props.artists.present.image}
                artistVisible={true}
        />
        }

        { this.props.tracks.length != 0 && !this.props.loading &&
          <Samples tracks={this.props.tracks}
                 playing={this.props.playing}
                 playHandler={::this.getPlaying}
                 visible={true}
        />
        }

        { this.props.artists.present && !this.props.loading &&
          <NodeGraph nodes={this.getNodeAndLines(this.props).nodes} lines={this.getNodeAndLines(this.props).lines} nodeClickHandler={::this.nodeClickHandler}/>
        }

        { this.props.loading &&
          <Sentry className='node-graph-loading' color="#727981" size={32} speed={0.9}/>
        }

        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.artists,
    tracks: state.tracks,
    loading: state.loading,
    playing: state.playing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeGraphContainer)
