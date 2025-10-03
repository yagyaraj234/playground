#include <iostream>
#include <map>
#include <vector>

using namespace std;

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]

// Input: nums = [3,2,4], target = 6
// Output: [1,2]

// Input: nums = [3,3], target = 6
// Output: [0,1]

vector<int> twoSum(vector<int> &nums, int target)
{
    int length = nums.size();
    vector<int> v;

    map<int, int> mp;

    for (int i = 0; i < length;i++){
        int newNum = nums[i];
        int valueToCheck = target - newNum;
        if ( mp[valueToCheck] ){
            v.push_back(newNum);
            v.push_back(valueToCheck);
            break;
        }else{
            mp[newNum]++;
        }
    }
    return v;
}

int main()
{

    vector<int> arr = {2, 7, 11, 15};
    vector<int> arr2 = {3, 24, 6};
    vector<int> arr3 = {5, 1, 6, 16, 782, 7, 2, 631, 4, 63, 4};
    int target = 9;

  

    vector<int> result = twoSum(arr, target);
    for (int x : result)
    {
        cout << x << " ";
    }
    cout << endl;

    vector<int> result2 = twoSum(arr2, 27);
    for (int x : result2)
    {
        cout << x << " ";
    }
    cout << endl;
    vector<int> result3 = twoSum(arr3, 798);
    for (int x : result3)
    {
        cout << x << " ";
    }
    cout << endl;
    return 0;
}