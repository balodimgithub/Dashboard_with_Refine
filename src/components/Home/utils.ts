import type { GetFieldsFromList
 } from "@refinedev/nestjs-query";
 import  dayjs from "dayjs";
 import type {DashboardDealChartQuery} from "@/graphql/types";
 type DealStage = GetFieldsFromList<DashboardDealChartQuery>;
 type DealAggregate = DealStage["dealsAggregate"][0];

 interface MappedDealData {
    timeUnix : number;
    timeText : string;
    value : number;
    state : string
 }
 const filterDeal =
  (deal ?: DealAggregate)=>   deal?.groupBy?.closeDateMonth && deal?.groupBy?.closeDateYear
 
const MapDeal = (deals : DealAggregate[],
    state : string
): MappedDealData[]=> {
    return deals?.filter(filterDeal).map((deal)=> {
        const {closeDateMonth, closeDateYear} =
        deal?.groupBy as NonNullable<DealAggregate["groupBy"]>;

        const date = dayjs(`${closeDateYear}- ${closeDateMonth}-01`)
        return{
            timeUnix : date.unix(),
            timeText : date.format("MMM YYYY"),
            value: deal?.sum?.value ?? 0,
            state
        }
    })
}

export const mapDealsData = (dealStages : DealStage[] = []): MappedDealData[]=> {
    const won = dealStages.find((stages)=> stages.title === "WON");
    const wonStage = MapDeal(won?.dealsAggregate, "Won");
    const lost = dealStages.find((stage)=> stage.title === "LOST");
    const lostStage = MapDeal(lost?.dealsAggregate, "Lost")
  return [...wonStage, ...lostStage].sort((a,b)=> a.timeUnix - b.timeUnix)
}