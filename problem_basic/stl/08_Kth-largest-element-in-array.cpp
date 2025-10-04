#include<iostream>
#include<queue>
using namespace std;




int largestElement(vector<int> a,int k){
    priority_queue<int> pq;

    int i = 0;
    while (i < a.size())
    {
        pq.push(a[i]);
        i++;
    }

    while (k > 1)
    {
        pq.pop();
        k--;
    }

    return pq.top();

    return 0;
}

int main(){
    vector<int> arr = {3,2,3,1,2,4,5,5,6};

    int result = largestElement(arr, 4);

    cout << "Result " << result << endl;

    return 0;
}