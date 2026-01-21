import styled from 'styled-components'

export const PlayerStyled = styled.div`
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
  * {
    user-select: none;
  }

  audio {
    width: 100%;
    display: none;
  }

  .slider {
    width: 100%;
  }

  .time {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    flex-wrap: nowrap;
    white-space: nowrap;
    width: 19ch;
    justify-content: flex-end;
    gap: 3px;

    span {
      width: 6ch;
    }
    span.small {
      width: 1ch;
    }
  }

  .ant-btn {
    min-width: 30px;
    min-height: 30px;
  }
`
