import { Row, Col } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { motion, spring } from 'framer-motion';
import '@/css/dashboard/card.css';

interface CardProps {
  title: string;
  children: React.ReactNode;
  extend?: boolean;
  intervalType?: any;
  onChange?: (intervalType: string) => void;
  disable?: boolean;
}

export default function Card({ title, children, extend, onChange, disable }: CardProps) {
  const handleIntervalClick = (intervalType: string) => {
    if (onChange) {
      onChange(intervalType);
    }
  };
  return (
    <>
      <div className="disClick" data-is-open={!extend}></div>
      <motion.div layout transition={spring} className="container cardContainer" data-is-extend={extend}>
        <Row>
          <Col xs={11}>
            <h4>{title}</h4>
          </Col>
          {!disable && (
            <Col xs={1} className="btnStatistic dropdown-center">
              <div className="dropdown">
                <button
                  className="btn btn-transparent"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  <BsThreeDotsVertical />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item" onClick={() => handleIntervalClick('week')}>
                    Tuần
                  </button>
                  <button className="dropdown-item" onClick={() => handleIntervalClick('month')}>
                    Tháng
                  </button>
                  <button className="dropdown-item" onClick={() => handleIntervalClick('year')}>
                    Năm
                  </button>
                </div>
              </div>
            </Col>
          )}
        </Row>
        <Row>{children}</Row>
      </motion.div>
    </>
  );
}
