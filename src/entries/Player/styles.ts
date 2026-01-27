import styled, { css } from 'styled-components'

export const PlayerStyled = styled.div<{
  $isStandalone: boolean
}>`
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: #fff;
  margin-top: 5px;
  padding: 10px;
  font-size: 16px;
  user-select: none;
  border-radius: 3px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  &,
  * {
    -webkit-user-select: none;
    user-select: none;

    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }

  audio {
    width: 100%;
    display: none;
  }

  .slider {
    position: absolute;
    left: 5px;
    right: 5px;
    top: -5px;
    .ant-slider {
      margin: 0;
    }
  }

  .controls {
    display: flex;
    gap: 5px;
    flex: 0;
    align-items: center;
  }

  .full {
    flex: 1 auto;
  }

  .time {
    flex: 0;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    flex-wrap: nowrap;
    white-space: nowrap;
    justify-content: flex-start;
    gap: 3px;

    span {
      width: 6ch;
    }
    span.small {
      width: 1ch;
    }
  }

  ${(props) =>
    props.$isStandalone &&
    css`
      padding-bottom: 50px;
    `};

  .ant-btn {
    min-width: 30px;
    min-height: 30px;
  }

  .ant-slider-mark {
    top: -18px;
    display: none;
  }

  &:hover {
    .ant-slider-mark {
      display: block;
    }
  }
`
