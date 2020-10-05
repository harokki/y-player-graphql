import { useRouter } from 'next/router'
import { Input, Menu, Form, Image, Icon } from 'semantic-ui-react'

import styles from './index.module.css'

export const YplayerHeader: React.FC = () => {
  const router = useRouter()
  return (
    <Menu borderless className={styles.topMenu} fixed="top">
      <Menu.Item header className={styles.logo}>
        <div onClick={() => router.push(`/`)}>Y-player</div>
      </Menu.Item>
      <Menu.Menu className={styles.navContainer}>
        <Menu.Item className={styles.searchInput}>
          <Form className={styles.searchForm}>
            <Form.Field>
              <Input placeholder="Search" size="small" action="Go" />
            </Form.Field>
          </Form>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Icon className="header-icon" name="video camera" size="large" />
          </Menu.Item>
          <Menu.Item>
            <Icon className="header-icon" name="grid layout" size="large" />
          </Menu.Item>
          <Menu.Item>
            <Icon className="header-icon" name="chat" size="large" />
          </Menu.Item>
          <Menu.Item>
            <Icon className="header-icon" name="alarm" size="large" />
          </Menu.Item>
          <Menu.Item name="avatar">
            <Image src="https://via.placeholder.com/80x80" avatar />
          </Menu.Item>
        </Menu.Menu>
      </Menu.Menu>
    </Menu>
  )
}
