import { container, type InjectionToken } from "tsyringe";
import "./index";

/**
 * IoC container adapter for TSOA
 * Allows TSOA to resolve controller dependencies
 */
export const iocContainer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T>(controller: any): T {
    return container.resolve<T>(controller as InjectionToken<T>);
  },
};
