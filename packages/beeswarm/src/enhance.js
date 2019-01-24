/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import setDisplayName from 'recompose/setDisplayName'
import {
    withTheme,
    withDimensions,
    withMotion,
    withColors,
    getInheritedColorGenerator,
} from '@nivo/core'
import { BeeSwarmSvgDefaultProps, BeeSwarmCanvasDefaultProps } from './props'
import { computeBeeSwarmNodes } from './compute'

const commonEnhancers = [
    withTheme(),
    withDimensions(),
    withColors(),
    withMotion(),
    withPropsOnChange(
        ['data', 'layout', 'scale', 'width', 'height', 'gap', 'nodeSize', 'nodePadding'],
        computeBeeSwarmNodes
    ),
    withPropsOnChange(['nodes', 'getColor'], ({ nodes, getColor }) => ({
        nodes: nodes.map(n => ({
            ...n,
            color: getColor(n),
        })),
    })),
    withPropsOnChange(['borderColor'], ({ borderColor }) => ({
        getBorderColor: getInheritedColorGenerator(borderColor),
    })),
]

export const enhanceSvg = Component =>
    setDisplayName(Component.displayName)(
        compose(
            defaultProps(BeeSwarmSvgDefaultProps),
            ...commonEnhancers,
            pure
        )(Component)
    )

export const enhanceCanvas = Component =>
    setDisplayName(Component.displayName)(
        compose(
            defaultProps(BeeSwarmCanvasDefaultProps),
            ...commonEnhancers,
            pure
        )(Component)
    )