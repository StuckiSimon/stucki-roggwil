import classNames from 'classnames';
import React from 'react';
import styles from './grid.module.scss';

type Props = React.HTMLAttributes<HTMLDivElement>;

/**
 * Grid container component. It should be used only once as outer component.
 */
export const GridContainer: React.FC<Props> = ({ className, ...rest }) => {
  return <div className={classNames(styles.container, className)} {...rest} />;
};

type SpanMobile = '1' | '2' | '3' | '4';
type SpanTablet = '5' | '6';
type SpanDesktop = '7' | '8' | '9' | '10' | '11' | '12';

type GridItemProps = {
  span?: SpanMobile | SpanTablet | SpanDesktop;
  spanTablet?: SpanMobile | SpanTablet;
  spanMobile?: SpanMobile;
  createSubgrid?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const GridItem: React.FC<GridItemProps> = ({
  className,
  children,
  span = '12',
  spanTablet,
  spanMobile,
  createSubgrid = false,
}) => {
  return (
    <div
      className={classNames(
        styles[`span${span}`],
        {
          [styles.subgridContainer]: createSubgrid,
          [styles[`spanTablet${spanTablet}`]]: spanTablet !== undefined,
          [styles[`spanMobile${spanMobile}`]]: spanMobile !== undefined,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};
