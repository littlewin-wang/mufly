import React  from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

import { browserHistory } from 'react-router'

import {Avatar, Back, NodeGraph, Samples, GithubLink, Footer } from 'components'
import Sentry from 'react-activity/lib/Sentry'

class NodeGraphContainer extends React.Component {
  componentWillMount () {
    let id = this.props.routeParams.id
    this.getArtistsAndTracks(id)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.routeParams.id !== nextProps.routeParams.id) {
      this.getArtistsAndTracks(nextProps.routeParams.id)
    }

    // 1 - remove future nodes
  }

  componentWillUnmount () {
    this.props.actions.CLEAR_PAST_ARTISTS()
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

  getNodeAndLines () {
    return {
      nodes: [
        this.props.artists.past[this.props.artists.past.length - 1] ? {id: this.props.artists.past[this.props.artists.past.length - 1].id, name: this.props.artists.past[this.props.artists.past.length - 1].name, region: 'PAST', regionIndex: 1} : {},
        {id: this.props.artists.present.id, name: this.props.artists.present.name, region: 'PRESENT', regionIndex: 1},
        this.props.artists.future[0] ? {id: this.props.artists.future[0].id, name: this.props.artists.future[0].name, region: 'FUTURE', regionIndex: 0} : {},
        this.props.artists.future[1] ? {id: this.props.artists.future[1].id, name: this.props.artists.future[1].name, region: 'FUTURE', regionIndex: 1} : {},
        this.props.artists.future[2] ? {id: this.props.artists.future[2].id, name: this.props.artists.future[2].name, region: 'FUTURE', regionIndex: 2} : {}
      ],
      lines: [
        this.props.artists.past[this.props.artists.past.length - 1] ? {from: this.props.artists.past[this.props.artists.past.length - 1].id, to: this.props.artists.present.id} : {},
        this.props.artists.future[0] ? {from: this.props.artists.present.id, to: this.props.artists.future[0].id} : {},
        this.props.artists.future[1] ? {from: this.props.artists.present.id, to: this.props.artists.future[1].id} : {},
        this.props.artists.future[2] ? {from: this.props.artists.present.id, to: this.props.artists.future[2].id} : {}
      ]
    }
  }

  render () {
    console.log('past:', this.props.artists.past[this.props.artists.past.length-1] ? this.props.artists.past[this.props.artists.past.length-1].name : undefined, 'present:', this.props.artists.present ? this.props.artists.present.name : undefined, 'future1:', this.props.artists.future ? this.props.artists.future[0].name : undefined, 'future2:', this.props.artists.future ? this.props.artists.future[1].name : undefined, 'future3:', this.props.artists.future ? this.props.artists.future[2].name : undefined)

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
          <NodeGraph nodes={this.getNodeAndLines().nodes} lines={this.getNodeAndLines().lines} nodeClickHandler={::this.nodeClickHandler}/>
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
