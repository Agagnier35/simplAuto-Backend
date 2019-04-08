import {
  StatisticsResolvers,
  AdminStatisticsResolvers,
  AdminCarResearchStatisticsResolvers
} from "../../generated/yoga-client";

export const Statistics: StatisticsResolvers.Type = {
  ...StatisticsResolvers.defaultResolvers
};

export const AdminStatistics: AdminStatisticsResolvers.Type = {
  ...AdminStatisticsResolvers.defaultResolvers
};

export const AdminCarResearchStatistics: AdminCarResearchStatisticsResolvers.Type = {
  ...AdminCarResearchStatisticsResolvers.defaultResolvers
};
