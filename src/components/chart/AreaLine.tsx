import { ResponsiveLine } from "@nivo/line";
import { linearGradientDef } from "@nivo/core";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const AreaLine = ({ data /* see data tab */ }: { data: any }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
    xScale={{ type: "point" }}
    enableSlices="x"
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    curve="monotoneX"
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    colors={'green'}
    pointSize={7}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    enableArea={true}
    areaOpacity={0.1}
    useMesh={true}
    legends={[]}
    defs={[
      linearGradientDef("gradientA", [
        { offset: 0, color: "inherit" },
        { offset: 100, color: "inherit", opacity: 0 },
      ]),
    ]}
    fill={[{ match: "*", id: "gradientA" }]}
    sliceTooltip={({ slice }) => {
      return (
        <div className="p-1 px-2 bg-white border-2 border-gray-200 rounded-md">
          <div>
            {slice.points.map((point) => (
              <div key={point.id} style={{color: point.serieColor}}>
                <strong>{point.serieId}</strong>: {point.data.yFormatted} <br />
                Month: <strong>{point.data.xFormatted}</strong>
              </div>
            ))}
            
          </div>
        </div>
      );
    }}
  />
);
export default AreaLine;
