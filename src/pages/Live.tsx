
import Layout from '@/components/Layout';
import { Calendar, Users, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';

const liveServices = [
  {
    title: "Sunday Morning Service",
    time: "9:00 AM EST",
    viewers: "2.3K watching",
    status: "live",
    church: "Grace Community Church"
  },
  {
    title: "Evening Prayer",
    time: "7:00 PM EST",
    viewers: "856 watching",
    status: "live",
    church: "Faith Fellowship"
  },
  {
    title: "Wednesday Bible Study",
    time: "7:30 PM EST",
    viewers: "Starting in 2 hours",
    status: "upcoming",
    church: "New Life Church"
  },
];

const Live = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Radio className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">Live Services</h1>
        </div>

        {/* Live Now Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Live Now</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveServices.filter(service => service.status === 'live').map((service, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Radio className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-2">{service.church}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {service.viewers}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {service.time}
                      </div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Join Live
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Services */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Services</h2>
          <div className="space-y-4">
            {liveServices.filter(service => service.status === 'upcoming').map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-orange-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-gray-600 mb-2">{service.church}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {service.time}
                      </div>
                      <span>{service.viewers}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                    Set Reminder
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Live;
