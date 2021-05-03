import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
Enzyme.configure({ adapter: new Adapter() });

/**
 * Provide React globally as it is provided by reactR like this.
 */
global.React = React;

/**
 * Mock dayjs, available via htmlwidget dependencies.
 */
global.dayjs = dayjs;
global.dayjs_plugin_localizedFormat = localizedFormat;

/**
 * Mock crosstalk and filter handle.
 */
const filterHandleMock = {
  setGroup: jest.fn(),
  clear: jest.fn(),
  set: jest.fn(),
  on: jest.fn(),
};

global.crosstalk = {
  FilterHandle: jest.fn().mockImplementation(() => filterHandleMock),
};

/**
 * Mock HTMLWidgets.
 * Copied from https://github.com/ramnathv/htmlwidgets/blob/master/inst/www/htmlwidgets.js
 */
/* eslint-disable no-prototype-builtins */
global.HTMLWidgets = {
  dataframeToD3(df) {
    var names = [];
    var length;
    for (var name in df) {
      if (df.hasOwnProperty(name))
        names.push(name);
      if (typeof(df[name]) !== "object" || typeof(df[name].length) === "undefined") {
        throw new Error("All fields must be arrays");
      } else if (typeof(length) !== "undefined" && length !== df[name].length) {
        throw new Error("All fields must be arrays of the same length");
      }
      length = df[name].length;
    }
    var results = [];
    var item;
    for (var row = 0; row < length; row++) {
      item = {};
      for (var col = 0; col < names.length; col++) {
        item[names[col]] = df[names[col]][row];
      }
      results.push(item);
    }
    return results;
  }
};
/* eslint-enable */
