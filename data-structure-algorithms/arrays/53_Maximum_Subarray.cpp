#include<iostream>
#include<vector>
using namespace std;


int maxSubArray(vector<int> nums)  {

    int max=INT_MIN;
    int maxi = 0;

    for (int i=0;i<nums.size();i++){
        maxi+=nums[i];

        if(maxi>max){
            max = maxi;
        }

        if(maxi <0){
            maxi = 0;
        }
    }

    return max;
}

int main(){

    vector<int> v = {-2, 1, -3, 4, -1, 2, 1, -5, 4};

    cout << maxSubArray(v);

    return 0;
}