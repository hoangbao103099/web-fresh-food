import React from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const ButtonInputSearch = (props) => {
	const {
		size,
		placeholder,
		textButton,
		boderred,
		backgroundColorInput = '#fff',
		backgroundColorButton = 'rgb( 13, 92, 182)',
		colorButton = '#fff',
	} = props
	return (
		<div style={{ display: 'flex', backgroundColor: '#fff' }}>
			<Input
				size={size}
				placeholder={placeholder}
				boderred={boderred}
				style={{ backgroundColor: backgroundColorInput }}
			/>
			<Button
				size={size}
				style={{ background: backgroundColorButton }}
				icon={<SearchOutlined color={colorButton} boderred={boderred} />}
			>
				<span style={{ color: colorButton }}>{textButton}</span>
			</Button>
		</div>
	)
}

export default ButtonInputSearch
