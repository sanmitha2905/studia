import { ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CTASection() {
  const navigate = useNavigate();
  // Chart data for weekly study goal
  const weekData = [
    { day: "Mon", hours: 6 },
    { day: "Tue", hours: 8 },
    { day: "Wed", hours: 9 },
    { day: "Thu", hours: 10 },
    { day: "Fri", hours: 8 },
    { day: "Sat", hours: 6 },
    { day: "Sun", hours: 0 },
  ];

  const maxHours = Math.max(...weekData.map((d) => d.hours)) || 1;
  const totalHours = weekData.reduce((sum, d) => sum + d.hours, 0);

  return (
    <section className="w-full bg-gradient-to-r from-red-50 via-white to-red-50 text-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text and CTA */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Ready to transform your
              <span className="text-red-600 block">academic journey?</span>
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              Experience a smarter way to learn with dedicated sessions and progress tracking
            </p>

            {/* Features list */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Check size={20} className="text-green-600" />
                <span className="text-gray-700 font-medium">Free to use forever</span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={20} className="text-green-600" />
                <span className="text-gray-700 font-medium">No credit card required</span>
              </div>
            </div>

            {/* CTA Button */}
            <button onClick={() => navigate("/auth/login")} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
              Start Your Free Account
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Right side - Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            {/* Chart Header */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Weekly Study Goal</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-red-600">{totalHours * 2}%</span>
                <span className="text-gray-600">+12% from last week</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">{totalHours}/48 hrs</div>
            </div>

            {/* Chart Bars */}
            <div className="flex items-end justify-between h-40 gap-2">
              {weekData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  {/* Bar */}
                  <div className="w-full bg-gray-200 rounded-t overflow-hidden h-32 flex items-end">
                    {data.hours > 0 && (
                      <div
                        className="w-full bg-red-600 rounded-t transition-all hover:bg-red-700"
                        style={{
                          height: `${(data.hours / maxHours) * 100}%`,
                        }}
                      ></div>
                    )}
                  </div>
                  {/* Label */}
                  <span className="text-xs text-gray-600">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
