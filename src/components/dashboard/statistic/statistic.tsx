import { motion } from 'framer-motion';
import Card from '@/components/dashboard/statistic/card';
import { TbTruckDelivery } from 'react-icons/tb';
import { LuPackageOpen } from 'react-icons/lu';
import { FiPackage } from 'react-icons/fi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import '@/css/dashboard/statistic.css';
import { UserRole } from '@/config/Enum';
import StatisticItem from './statisticItem';
import { useStatisticOrder, useStatisticWP } from '@/lib/custom-hook';
import Spinning from '@/components/common/spinning';

function StatisticOrder() {
  const { data, isLoading } = useStatisticOrder();

  if (isLoading) return <Spinning />;
  return <StatisticItem icon={<FiPackage />} title="Tổng hàng hóa" value={data || 0} color="totalPackage" />;
}

// function StatisticEmployee() {
//   const { data, isLoading } = useStatisticEmployee();
//   if (isLoading) return <Spinning />;
//   return <StatisticItem icon={<TbTruckDelivery />} title="Đang vận chuyển" value="80" color="transPoint" />;
// }

function StatisticWorkPlate({ type }: { type: number }) {
  const { data, isLoading } = useStatisticWP(type);
  if (isLoading) return <Spinning />;
  if (type === 2)
    return <StatisticItem icon={<TbTruckDelivery />} title="Số điểm giao dịch" value={data || 0} color="transPoint" />;
  return <StatisticItem icon={<LuPackageOpen />} title="Số điểm trung chuyển" value={data || 0} color="goodPoint" />;
}

export default function Statistic({ role }: { role: string }) {
  const data2 = {
    totalProfit: 1000000,
  };

  if (data2) console.log(data2);
  const commonStats = [
    <StatisticItem
      key="0"
      icon={<FaRegMoneyBillAlt />}
      title="Lợi nhuận"
      value={data2?.totalProfit?.toLocaleString('en-US') || '0'}
      color="profit"
    />,
    <StatisticOrder key="1" />,
  ];
  return (
    <motion.div>
      <Card title="Tổng quan" disable>
        <div className="d-flex justify-content-between flex-wrap">
          {role === UserRole.Admin && (
            <>
              {commonStats}
              <StatisticWorkPlate type={2} />
              <StatisticWorkPlate type={3} />
            </>
          )}

          {role === UserRole.Manager && (
            <>
              {/* {commonStats} */}
              <StatisticItem icon={<TbTruckDelivery />} title="Đang vận chuyển" value="90" color="transPoint" />
              <StatisticItem icon={<LuPackageOpen />} title="Đã vận chuyển" value="42" color="goodPoint" />
            </>
          )}

          {role === UserRole.Employee && (
            <>
              {/* <StatisticOrder /> */}
              <StatisticItem icon={<TbTruckDelivery />} title="Đang vận chuyển" value="80" color="transPoint" />
              <StatisticItem icon={<LuPackageOpen />} title="Đã vận chuyển" value="43" color="goodPoint" />
            </>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
