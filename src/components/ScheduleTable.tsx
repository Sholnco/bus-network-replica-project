
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Stop {
  name: string;
  times: {
    weekday: string[];
    weekend: string[];
  };
}

interface ScheduleTableProps {
  routeName: string;
  routeId: string;
  stops: Stop[];
  day: 'weekday' | 'weekend';
}

export default function ScheduleTable({ 
  routeName, 
  routeId, 
  stops, 
  day = 'weekday' 
}: ScheduleTableProps) {
  const dayLabel = day === 'weekday' ? 'Weekday' : 'Weekend';
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-csn-blue text-white">
        <h3 className="text-lg font-semibold">{routeName} Schedule - {dayLabel}</h3>
        <p className="text-sm opacity-90">All times are approximate and subject to traffic conditions</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>
            Schedule for Route {routeId} - {dayLabel} service
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Stop Location</TableHead>
              {stops[0]?.times[day].map((_, index) => (
                <TableHead key={index} className="text-right">Trip {index + 1}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {stops.map((stop) => (
              <TableRow key={stop.name}>
                <TableCell className="font-medium">{stop.name}</TableCell>
                {stop.times[day].map((time, index) => (
                  <TableCell key={index} className="text-right">{time}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
