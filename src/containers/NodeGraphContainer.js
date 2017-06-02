import React  from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

import {Avatar, Back, NodeGraph, Samples, GithubLink, Footer } from 'components'

class NodeGraphContainer extends React.Component {
  componentWillMount () {
    let id = this.props.routeParams.id
    this.props.actions.GET_PRESENT_ARTIST(id)
    this.props.actions.GET_TOP_TRACKS(id)
  }

  getPlaying (id) {
    this.props.actions.GET_PLAYING_TRACK(id)
  }

  getNodeAndLines () {
    return {
      nodes: [
        {id: 'Test1', region: 'PAST', regionIndex: 1},
        {id: this.props.artists.present.name, region: 'PRESENT', regionIndex: 1},
        this.props.artists.future[0] ? {id: this.props.artists.future[0].name, region: 'FUTURE', regionIndex: 0} : {},
        this.props.artists.future[1] ? {id: this.props.artists.future[1].name, region: 'FUTURE', regionIndex: 1} : {},
        this.props.artists.future[2] ? {id: this.props.artists.future[2].name, region: 'FUTURE', regionIndex: 2} : {}
      ],
      lines: [
        {from: 'Test1', to: this.props.artists.present.name},
        this.props.artists.future[0] ? {from: this.props.artists.present.name, to: this.props.artists.future[0].name} : {},
        this.props.artists.future[1] ? {from: this.props.artists.present.name, to: this.props.artists.future[1].name} : {},
        this.props.artists.future[2] ? {from: this.props.artists.present.name, to: this.props.artists.future[2].name} : {}
      ]
    }
  }

  render () {
    return (
      <div className="node-graph-wrapper">
        <Back />
        <GithubLink />
        { this.props.artists.present &&
          <Avatar artistAvatarUrl={this.props.artists.present.image}
                  artistVisible={true}
          />
        }

        { this.props.tracks.length != 0 &&
          <Samples tracks={this.props.tracks}
                   playing={this.props.playing}
                   playHandler={::this.getPlaying}
          />
        }

        { this.props.artists.present &&
          <NodeGraph nodes={this.getNodeAndLines().nodes} lines={this.getNodeAndLines().lines} />
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
