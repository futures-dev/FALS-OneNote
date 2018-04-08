import "./Bank/index";
import "./Entities/index";
import "./Facades/index";
import "./Pasca/index";
import "./Serialization/index";
import "./Statistics/index";

import { Serialize } from "Service/Fals/Serialization/Serialize";

export function deserialize(obj: any) {
  if (obj === false || obj === true) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(q => deserialize(q));
  }
  if (obj) {
    if (!obj.type) {
      return obj;
    }

    let proto = Serialize.Types[obj.type];
    if (proto && proto.prototype) {
      let instance = Object.create(proto.prototype);

      for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
          continue;
        }

        instance[prop] = deserialize(obj[prop]);
      }

      console.log(instance.type + " , equals=" + instance.equals);
      return instance;
    } else {
      return obj;
    }
  } else {
    return null;
  }
}
