import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Drawer.css";
import { Typography } from "../Typography";
import { ButtonDismiss } from "../ButtonDismiss";

interface DrawerProps {
  readonly children: ReactNode | ReactNode[];
  readonly title: string;
  /**
   * @default true
   */
  readonly open?: boolean;
  onRequestClose(): void;

  /**
   * Initial open value of the drawer. Only use this when you need to
   * pre-populate the checked attribute that is not controlled by the component's
   * state. If a state is controlling it, use the `checked` prop instead.
   */
}

export function Drawer({
  title,
  children,
  open = true,
  onRequestClose,
}: DrawerProps) {
  const drawerClassNames = classnames(styles.container, open && styles.open);
  return (
    <>
      <aside
        className={drawerClassNames}
        data-testid="drawer-container"
        aria-label={title}
      >
        <div className={styles.drawer}>
          <Header title={title} onRequestClose={onRequestClose} />
          <div className={styles.contentScroll}>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </aside>
    </>
  );
}

interface HeaderProps {
  title: string;
  onRequestClose?(): void;
}

function Header({ title, onRequestClose }: HeaderProps) {
  return (
    <div className={styles.header} data-testid="drawer-header">
      <Typography
        element="h3"
        size="large"
        textCase="uppercase"
        fontWeight="extraBold"
      >
        {title}
      </Typography>

      <ButtonDismiss onClick={onRequestClose} ariaLabel="Close drawer" />
    </div>
  );
}
