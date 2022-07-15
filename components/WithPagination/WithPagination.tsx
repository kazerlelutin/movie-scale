/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./WithPagination.module.css";
import { useState, useEffect, Children, cloneElement, useMemo } from "react";
import Pagination from "../_ui/Pagination/Pagination";
import useFetch from "../../utils/hooks/useFetch";

interface props {
  readonly url: string;
  readonly children: any;
  readonly perPage?: number;
  readonly cursorType: string;
  readonly body?: Object;
}

export default function WithPagination({
  children,
  url,
  cursorType,
  perPage,
  body,
}: props) {
  const [{ items, count, cursor }, setState] = useState<{
      items: Array<any>;
      count: number;
      cursor: any;
    }>({ items: [], count: 0, cursor: undefined }),
    { data, loading, refetch } = useFetch(url, {
      ...body,
      take: perPage || 25,
      cursor,
    }),
    memoItems = useMemo(() => items, [items]);

  useEffect(() => {
    if (data) {
      setState({
        items: [...items, ...data].reduce((acc, value) => {
          if (Array.isArray(acc)) {
            const isExist = acc.find(
              (o) => o[cursorType] === value[cursorType]
            );
            if (!isExist) {
              acc.push(value);
            }

            return acc;
          } else {
            return [value];
          }
        }, []),
        count: items.length,
        cursor: data[data.length - 1]
          ? data[data.length - 1][cursorType]
          : null,
      });
    }
  }, [data]);

  return (
    <div className={classes.container}>
      {Children.map(children, (child) =>
        cloneElement(child, { items: memoItems, refetch, setState,state:{ items, count, cursor } })
      )}
      {!loading && items && items.length > 0 && items.length > count && (
        <Pagination onTrigger={() => refetch()} />
      )}
    </div>
  );
}
