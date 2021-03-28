const FIVE_SECONDS = 5000;
// This module is just here for the exercise and doesn't actually do anything.
// In reality, what I would recommend for a function like this is that it keeps
// a queue of all updates and every 10 seconds it sends profile data to your
// server if there's any data in the queue.
// Then you presumably graph that data in Grafana or similar
let queue = [];

/**
 * The Profiler requires an onRender function as a prop.
 * React calls this function any time a component within the profiled tree “commits” an update.
 * It receives parameters describing what was rendered and how long it took.
 * {@link https://reactjs.org/docs/profiler.html}
 * This function gathers this data and appends it to a queue
 * @param {String} id - the id prop of the Profiler tree that has just committed.
 * This can be used to identify which part of the tree was committed
 * if you are using multiple profilers.
 * @param {String('mount'|'update')} phase - identifies whether the tree has just been mounted
 * for the first time
 * or re-rendered due to a change in props, state, or hooks.
 * @param {Number} actualDuration - time spent rendering the Profiler
 * and its descendants for the current update.
 * This indicates how well the subtree makes use of memoization
 * (e.g. React.memo, useMemo, shouldComponentUpdate).
 * Ideally this value should decrease significantly after
 * the initial mount as many of the descendants will only need to re-render
 * if their specific props change.
 * @param {Number} baseDuration - duration of the most recent render time
 * for each individual component within the Profiler tree.
 * This value estimates a worst-case cost of rendering
 * (e.g. the initial mount or a tree with no memoization).
 * @param {Number} startTime - timestamp when React began rendering the current update.
 * @param {Number} commitTime - timestamp when React committed the current update.
 * This value is shared between all profilers in a commit, enabling them to be grouped if desirable.
 * @param {Set.<Interaction>} interactions - set of “interactions” that were being traced
 * when the update was scheduled
 * (e.g. when render or setState were called).
 * {@link https://fb.me/react-interaction-tracing}
 * @returns {void}
 */

const reportProfile = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions,
) => {
  queue.push({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  });
};

/**
 * This function is where we'd actually make the server call to send the queueToSend
 * data to our backend...
 * @returns {Promise}
 */

const sendProfileQueue = () => {
  if (!queue.length) {
    return Promise.resolve();
  }
  // Make a copy of the queue and transform it to have additional <key, value>
  const queueToSend = queue.map((q, i) => ({
    ...q,
    // Time stamp of the difference in time between the current item and the first item
    commitTimeDifferenceFromFirst: q.commitTime - queue[0].commitTime,
    // Time stamp of the difference in time between the current item and the previous item
    commitTimeDifferenceFromPrevious: i === 0 ? 0 : q.commitTime - queue[i - 1].commitTime,
  }));

  // Reset the queue
  queue = [];

  console.info('Sending profile queue: ', queueToSend);

  return Promise.resolve();
};

// We're doing every 5 seconds so we don't have to wait forever...
// actual time may vary based on your app's needs
setInterval(sendProfileQueue, FIVE_SECONDS);

export default reportProfile;
