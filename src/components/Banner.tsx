import React from 'react'
import clsx from 'clsx'

class Banner extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            className,
            backgroundImage = undefined,
            odd = false,
            even = false,
            ...props
        } = this.props
        const classNameResolved = clsx("Banner", {
            odd: odd,
            even: even
        })
        console.log(classNameResolved)
        const sectionStyle = {};
        if (backgroundImage) {
            sectionStyle['backgroundImage'] = `url(${backgroundImage})`
        }
        return (
            <div
                className={classNameResolved}
                style={sectionStyle}
                {...props}
            >{this.props.children}</div>
        )
    }
}

export default Banner
