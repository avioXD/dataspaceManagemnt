import React from "react";
import { useLocation, useParams } from "react-router-dom";
import type { Location, Params } from "react-router-dom";

/**
 * Function converts path like /user/123 to /user/:id
 */
const getRoutePath = (location: Location, params: Params): string => {
  const { pathname } = location;

  if (!Object.keys(params).length) {
    return pathname; // we don't need to replace anything
  }

  let path = pathname;
  Object.entries(params).forEach(([paramName, paramValue]) => {
    if (paramValue) {
      path = path.replace(paramValue, `:${paramName}`);
    }
  });
  return path;
};

export const CurrentPath = () => {
  const location = useLocation();
  const params = useParams();
  const path = getRoutePath(location, params);
};
