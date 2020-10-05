import { Menu } from 'semantic-ui-react'

import { PlaylistMenu } from '@/components/playlist'
import styles from './index.module.css'

type Props = {
  mainForm: JSX.Element | null
}

export const SideBar: React.FC<Props> = ({ mainForm }) => {
  return (
    <Menu
      borderless={true}
      vertical={true}
      stackable={true}
      fixed="left"
      className={styles.sideNav}
    >
      {mainForm && <Menu.Item>{mainForm}</Menu.Item>}
      <PlaylistMenu />
    </Menu>
  )
}
