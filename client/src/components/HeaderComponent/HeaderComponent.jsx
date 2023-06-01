import React from 'react'
import { Col } from 'antd' 
import { WrapperHeader, WrapperTextHearder , WrapperHeaderAccount , WrapperTextHearderSmall } from './style' 
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import { UserOutlined , CaretDownOutlined , ShoppingCartOutlined } from '@ant-design/icons';




const HeaderComponent = () => {
  return (
    <div>
    <WrapperHeader gutter={16}>
      <Col span={6}>
      <WrapperTextHearder>ThựcPhẩmNôngNghiệpSạch</WrapperTextHearder>
      </Col>
      <Col span={12}>
            <ButtonInputSearch
            size ="large"
            textButton ="Tìm Kiếm" 
            placeholder="input search text"  
            enterButton 
            //onSearch={onSearch}
            />
      </Col>
      <Col span={6} style={{  display: 'flex',  gap:'20px' }}>
            <WrapperHeaderAccount>
              <UserOutlined style={{fontSize: '30px' }}/>
              <div>
                  <WrapperTextHearderSmall>Đăng Nhập/Đăng Kí</WrapperTextHearderSmall>
              <div>
                  <WrapperTextHearderSmall>Tài Khoản</WrapperTextHearderSmall>
                  <CaretDownOutlined />
              </div>
              </div>
            </WrapperHeaderAccount>
            <div>
              <ShoppingCartOutlined style={{fontSize: '30px' ,color :'#fff'}}/>
              <WrapperTextHearderSmall>Giỏ Hàng</WrapperTextHearderSmall>
            </div>
      </Col>
    </WrapperHeader>

    </div>
  )
}
export default HeaderComponent