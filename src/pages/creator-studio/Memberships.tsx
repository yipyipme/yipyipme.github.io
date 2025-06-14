
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  UserCheck, 
  Plus, 
  DollarSign,
  Users,
  Crown,
  Edit,
  TrendingUp
} from 'lucide-react';
import { platformStore } from '@/lib/store';

const Memberships = () => {
  const membershipTiers = platformStore.getMembershipTiers();
  const totalMembers = membershipTiers.reduce((sum, tier) => sum + tier.memberCount, 0);
  const monthlyRevenue = membershipTiers.reduce((sum, tier) => sum + (tier.price * tier.memberCount), 0);

  return (
    <CreatorStudioLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-[#FDBD34] to-[#FF8A3D] p-3 rounded-2xl">
              <UserCheck className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Memberships</h1>
              <p className="text-gray-400 mt-2">Manage your membership tiers and subscribers</p>
            </div>
          </div>
          <Button className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern">
            <Plus className="h-4 w-4 mr-2" />
            New Tier
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalMembers}</div>
              <p className="text-xs text-green-400 mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% this month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${monthlyRevenue.toFixed(2)}</div>
              <p className="text-xs text-green-400 mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +8% this month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Tiers</CardTitle>
              <Crown className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{membershipTiers.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg. Tier Price</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${(membershipTiers.reduce((sum, tier) => sum + tier.price, 0) / membershipTiers.length).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {membershipTiers.map((tier) => (
            <Card key={tier.id} className="bg-gray-900/50 border-gray-800 card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Crown className="h-5 w-5 text-[#FDBD34]" />
                    {tier.name}
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#FDBD34] btn-modern">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-2xl font-bold text-[#FDBD34]">
                  ${tier.price}/month
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Members</span>
                  <Badge variant="secondary">{tier.memberCount}</Badge>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-medium">Perks:</h4>
                  <ul className="space-y-1">
                    {tier.perks.map((perk, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#FDBD34] rounded-full"></div>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Monthly Revenue</span>
                    <span className="text-green-400 font-medium">
                      ${(tier.price * tier.memberCount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Member Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">Sarah M. upgraded to Partner tier</span>
                </div>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-white">John D. joined Supporter tier</span>
                </div>
                <span className="text-gray-500 text-sm">4 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white">Mary K. became an Elder member</span>
                </div>
                <span className="text-gray-500 text-sm">6 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CreatorStudioLayout>
  );
};

export default Memberships;
