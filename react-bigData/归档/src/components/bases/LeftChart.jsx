import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import store from '../../redux/store'
const colors = scaleOrdinal(schemeCategory10).range();
const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
    const {
        fill, x, y, width, height,
    } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
    fill: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
};
export default class LeftChart extends Component {
    constructor(props){
        super(props)
        this.state = store.getState()
        store.subscribe(()=>{
            this.setState(store.getState())
        })
        // this.state = {
        //     co2Data:[],
        //     storeData:store.getState()
        // }
    }
    componentDidMount() {
        // this.getData()
    }
    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return
        }
    }
    
    render() {
        const { co2data} = this.state
        // console.log(storeData)
        return (
            <div>
                <BarChart
                    width={500}
                    height={300}
                    data={co2data}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Bar dataKey="co2_potency" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {
                            co2data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </div>
        )
    }
}
